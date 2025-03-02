import { JSX } from 'react';

export const IfRender = (props: { condition: boolean | any; children: any  }) =>
  props?.condition ? props?.children : null;

export const MapRender = <T>(props: { items: T[]; render: (item: T, index: number) => JSX.Element }) =>
  props.items.map((item: T, index: number) => props.render(item, index));

