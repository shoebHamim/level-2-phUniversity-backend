export type TErrorSources = {
  path: (string|number)[];
  message: string;
  error?: any;
}[];

export type TGenericErrorResponse={
  success:boolean;
  message:string;
  errorSources:TErrorSources;
  stack?:string
}
