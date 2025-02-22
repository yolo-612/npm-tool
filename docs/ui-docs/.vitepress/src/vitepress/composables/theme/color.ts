import Color from 'colorjs.io';
interface itemType {
  var: string;
  isBaseColor?: Boolean;
}

export function gradient(v: string, item: itemType) {
  const el: any = document.querySelector('.element-plus');
  const light = [
    {
      gradient: 3,
      val: 10
    },
    {
      gradient: 5,
      val: 25
    },
    {
      gradient: 7,
      val: 25
    },
    {
      gradient: 8,
      val: 43
    },
    {
      gradient: 9,
      val: 47
    }
  ];

  var color = new Color(v);
  // light
  light.forEach((x) => {
    color = new Color(v);
    el.style.setProperty(
      item.var + `-light-${x.gradient}`,
      color.set('hsl.l', (l) => l + x.val)
    );
  });

  color = new Color(v);
  // dark
  el.style.setProperty(
    item.var + `-dark-2`,
    color.set('hsl.l', (l) => l - 10)
  );
}
