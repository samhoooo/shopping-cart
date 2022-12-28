interface IErrorFallback {
  errorMessage: String;
}

export default function ErrorFallback(props: IErrorFallback) {
  return (
    <div role="alert" className="error">
      <p>Something went wrong:</p>
      <pre>{props.errorMessage}</pre>
    </div>
  );
}
