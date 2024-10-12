import { atom, useAtom } from "jotai";

interface InitialState {
  keySearch?: string;
}

const searchState = atom<InitialState>({
  keySearch: "",
});

export const useSearchAdaptorState = () => useAtom(searchState);
