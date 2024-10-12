export const numberFormat1 = (
  number: number | string,
  isReplaceZero = false
) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  if (isReplaceZero) {
    return currencyFormatter
      .format(Number(number))
      .replace("$", "")
      .replace(".00", "");
  }
  return currencyFormatter.format(Number(number)).replace("$", "");
};

export const numberFormat = (number: number | string, fixed?: number) =>
  Number(number).toFixed(fixed || 6);

export const formatNumberWithKM = (points: number, fixed?: number): string => {
  if (points >= 1000000) {
    return numberFormat1((points / 1000000).toFixed(1)) + "M";
  } else if (points >= 100000) {
    return (points / 1000).toFixed(1) + "K";
  } else if (points >= 10000) {
    return (points / 1000).toFixed(1) + "K";
  } else if (points >= 1000) {
    return (points / 1000).toFixed(1) + "K";
  } else {
    return numberFormat(points, fixed);
  }
};

//eslint-disable-next-line
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: Parameters<T>) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

export const openInNewTab = (url?: string) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};
