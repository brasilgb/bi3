interface DataDre {
  data?: any;
  estrutura?: any;
  mes?: any;
  ano?: any;
  valor?: any; // 0 = percent or 1 = value
}
export const dreListDataValue = ({
  data,
  estrutura,
  mes,
  ano,
  valor,
}: DataDre) => {
  const valueDre = data
    .filter(
      (dt: any) =>
        dt.EstruturaId === estrutura && dt.Mes === mes && dt.Ano == ano
    )
    .map((val: any) =>
      valor === 0
        ? isNaN(val.Percent)
          ? 0
          : val.Percent
        : isNaN(val.Valor)
          ? 0
          : val.Valor
    );
  return (
    <span
      className={`${Math.sign(valueDre) === -1 ? 'text-red-500' : Math.sign(valueDre) === 0 ? 'text-gray-300' : 'text-gray-500'}`}
    >
      {valor === 0
        ? (valueDre * 100).toFixed(2).replace('.', ',')
        : Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: 'BRL',
          }).format(valueDre)}
    </span>
  );
};
