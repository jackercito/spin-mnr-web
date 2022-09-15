import { Constants } from "ag-grid-community";

export const dateFormat = (params): string => {
  const options = { day: '2-digit', month: '2-digit', year: 'numeric' } as Constants;
  return new Date(params.value).toLocaleDateString('es-ES', options);
}

export const compararFechas = (filterLocalDateAtMidnight, cellValue): number => {
  const dateAsString = cellValue;

  if (dateAsString != null) {
    const dateParts = dateAsString.split("-");
    const cellDate = new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2].substr(0, 2)));

    if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
  }
  return 0;
}
