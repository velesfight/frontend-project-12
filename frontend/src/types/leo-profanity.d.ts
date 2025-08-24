declare module 'leo-profanity' {
  const filter: {
    clean: (word: string) => string;
    add: (words: string | string[]) => void;
    remove: (words: string | string[]) => void;
    list: () => string[];
  };
  export default filter;
}
