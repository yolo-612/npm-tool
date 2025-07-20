import EleConfigComp from '@yolo/ele-config-comp';
import '@yolo/ele-config-comp/dist/ele-config-comp.css'

export default function ({ app }:any) {
  app.use(EleConfigComp);
}
