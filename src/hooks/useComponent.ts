import React from "react";

const useComponent = <T>(
  page: string,
  id: string
): [T | undefined, string, (component: T) => void] => {
  const [state, setState] = React.useState<T>();
  const [status, setStatus] = React.useState<
    "default" | "Loading..." | "Success!" | "An unexpected error occurred."
  >("default");

  /**
   * TODO:
   * secure the PUT api calls
   */
  const setComponent = (component: T) => {
    setStatus("Loading...");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/${page}/${id}`, {
      method: "PUT",
      headers: {
        account: process.env.NEXT_PUBLIC_ACCOUNT!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(component),
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res);
        setStatus("Success!");
        setTimeout(() => setStatus("default"), 1250);
      })
      .catch((err) => {
        setStatus("An unexpected error occurred.");
        console.error(err);
      });
  };

  React.useEffect(() => {
    setStatus("Loading...");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/pages/${page}/${id}`, {
      headers: { account: process.env.NEXT_PUBLIC_ACCOUNT! },
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res);
        setStatus("default");
      })
      .catch(() => {
        setStatus("An unexpected error occurred.");
      });
  }, [page, id]);

  return [state, status, setComponent];
};

export default useComponent;
