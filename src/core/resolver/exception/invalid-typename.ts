export class InvalidTypename extends Error {
  constructor(
    public actualTypename: string,
    public expectedTypename: string,
  ) {
    super(
      `The query expected an ID for the typename "${expectedTypename}", but received an ID for the typename "${actualTypename}" instead.`,
    );
  }
}
