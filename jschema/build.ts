import { resolve } from 'path';
import { mkdir, readdir, rm, writeFile } from 'fs/promises';
import { cpus } from 'os';
import { isMainThread, parentPort, Worker } from 'worker_threads';
import * as TJS from 'typescript-json-schema';

import { baseDir, distDir, schemaDir } from './config';

const settings: TJS.PartialArgs = {
  required: true,
  noExtraProps: true
};

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
  paths: {
    '@t/*': [
      baseDir + '/*'
    ]
  }
};

type WorkerMessage = { type: 'run'; filename: string; } | { type: 'end'; };
type MainMessage = { type: 'ready'; } | { type: 'done'; } | { type: 'error'; message?: string; stack?: string; };

if (isMainThread) {
  readdir(schemaDir, { withFileTypes: true })
    .then(dirs =>
      dirs.filter(dir => dir.isDirectory())
        .map<Promise<[string, string[]]>>(async dir => [dir.name, await readdir(resolve(schemaDir, dir.name))])
    )
    .then(dirs => Promise.all(dirs))
    .then(dirs => dirs
      .flatMap(([dir, files]) => files.map(file => resolve(schemaDir, dir, file)))
      .filter(filename => /(\d+\.\d+\.\d+)(\.d)?\.ts$/.test(filename)))
    .then(filenames => programTypescript(filenames));
} else {
  runWorker();
}

async function programTypescript(filenames: string[]) {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  await buildSchemasWithWorkerPool(filenames);

  console.log('Build complete');
}

function buildSchemasWithWorkerPool(filenames: string[]) {
  return new Promise<void>((resolvePromise, rejectPromise) => {
    if (filenames.length === 0) {
      resolvePromise();
      return;
    }

    const maxWorkers = Math.max(1, Math.min(cpus().length, filenames.length));
    const workers: Worker[] = [];
    let nextIndex = 0;
    let completedCount = 0;
    let finishedWorkerCount = 0;
    let rejected = false;

    function shutdownWorkers() {
      for (const worker of workers) {
        worker.postMessage({ type: 'end' } satisfies WorkerMessage);
      }
    }

    function assignNextTask(worker: Worker) {
      if (rejected) {
        return;
      }

      const filename = filenames[nextIndex];

      if (!filename) {
        worker.postMessage({ type: 'end' } satisfies WorkerMessage);
        return;
      }

      nextIndex++;
      worker.postMessage({
        type: 'run',
        filename
      } satisfies WorkerMessage);
    }

    for (let i = 0; i < maxWorkers; i++) {
      const worker = new Worker(__filename);

      workers.push(worker);

      worker.on('message', (message: MainMessage) => {
        if (rejected) {
          return;
        }

        if (message.type === 'ready') {
          assignNextTask(worker);
          return;
        }

        if (message.type === 'done') {
          completedCount++;

          if (completedCount === filenames.length) {
            shutdownWorkers();
            return;
          }

          assignNextTask(worker);
          return;
        }

        if (message.type === 'error') {
          rejected = true;
          shutdownWorkers();
          rejectPromise(new Error(message.stack || message.message || 'Worker failed'));
        }
      });

      worker.on('error', error => {
        if (rejected) {
          return;
        }

        rejected = true;
        shutdownWorkers();
        rejectPromise(error);
      });

      worker.on('exit', code => {
        if (code !== 0 && !rejected) {
          rejected = true;
          shutdownWorkers();
          rejectPromise(new Error(`Worker stopped with exit code ${code}`));
          return;
        }

        finishedWorkerCount++;

        if (finishedWorkerCount === workers.length && !rejected) {
          resolvePromise();
        }
      });
    }
  });
}

function runWorker() {
  parentPort?.on('message', async (message: WorkerMessage) => {
    if (message.type === 'end') {
      process.exit(0);
    }

    try {
      await buildSchema(message.filename);
      parentPort?.postMessage({ type: 'done' } satisfies MainMessage);
    } catch (error) {
      parentPort?.postMessage({
        type: 'error',
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      } satisfies MainMessage);
    }
  });

  parentPort?.postMessage({ type: 'ready' } satisfies MainMessage);
}

async function buildSchema(filename: string) {
  const { schemaName, schemaVersion, typeName, file } = tsTypeFileName2TypeSymbolName(filename);

  const program = TJS.getProgramFromFiles([file], compilerOptions, baseDir);
  const schema = TJS.generateSchema(program, typeName, settings);

  console.log(`Build ok: ${schemaName}:${schemaVersion} => ${typeName}`);

  await writeFile(
    resolve(distDir, `${schemaName}_${schemaVersion}.json`),
    JSON.stringify(schema)
  );
}

function tsTypeFileName2TypeSymbolName(file: string) {
  const [, schemaName = null, schemaVersion = null] = file.match(/([\w-]+?)[\\/](\d+\.\d+\.\d+)(\.d)?\.ts$/) ?? [];
  const nameScope = schemaName?.replace(/-(\w)|(^\w)/g, (match, p1 = '', p2 = '') => `${p1}${p2}`.toUpperCase());

  return {
    schemaName,
    schemaVersion,
    typeName: nameScope + '.Main',
    file
  };
}
