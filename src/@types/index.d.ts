declare var require: {
  <T>(path: string): T;
  (paths: string[], callback: (...modules: any[]) => void): void;
  ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};

declare module 'maptalks'

declare module "@fortawesome/fontawesome-free-solid/faCoffee"
declare module "@fortawesome/react-fontawesome"
declare module "TianDiTuLayer" {
  const TianDiTuLayer;
  export = TianDiTuLayer;
}

declare var echarts: any;
declare module 'echarts' {
  export = echarts;
}