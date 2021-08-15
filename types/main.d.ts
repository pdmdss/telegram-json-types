export interface TelegramJSONMain {
  _originId: string;
  _schema: {
    type: string;
    version: string;
  };
  type: string;
  title: string;
  status: '通常' | '訓練' | '試験';
  infoType: '発表' | '訂正' | '遅延' | '取消';
  editorialOffice: string;
  publishingOffice: string[];
  pressDateTime: string;
  reportDateTime: string;
  targetDateTime: string;
  targetDateTimeDubious?: string;
  targetDuration?: string;
  validDateTime?: string;
  eventId: string | null;
  serialNo: string | null;
  infoKind: string;
  infoKindVersion: string;
  headline: string | null;
  body: object;
}
