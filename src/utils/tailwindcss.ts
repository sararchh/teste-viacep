export function overrideClass(current: string, override: string): string {
  const currentClasses = current.split(' ');
  const overrideClasses = override.split(' ');

  const classMap: { [key: string]: string } = {};

  currentClasses.forEach((cls) => {
     const [key] = cls.split('-');
     classMap[key] = cls;
  });

  overrideClasses.forEach((cls) => {
     const [key] = cls.split('-');
     classMap[key] = cls;
  });

  return Object.values(classMap).join(' ');
}
