import { useEffect, useState } from 'react';
import { ResultsOutputs } from '../components/ResultsOutput';
import { TestForm } from '../components/TestForm';

export function Tool() {
  const [ results, setResults ] = useState([] as string[])
  const [ domainList, setDomainList ] = useState([] as string[])
  const [ domain, setDomain ] = useState('')
  const [ isStreaming, setIsStreaming ] = useState(false)
  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const domain = Object.fromEntries(
      new FormData(event.currentTarget)
    ).domain.toString()
    setDomain(domain)
  }

  useEffect(
    () => {
      setIsStreaming(true)
    },
    [domain]
  )
  useEffect(
    () => {
      const es = new EventSource(`/api/goctopus/${domain}`)
      es.onopen = () => console.log(">>> Connection opened!");
      es.onerror = (e) => console.log("ERROR!", e);
      es.onmessage = (e) => {
        console.log(">>>", e.data)};
      return () => es.close();
    },
    [isStreaming === true]
  );



  /* useEffect(() => {
    if (domain) {
      async function setResultsFx () {
      await fetch(`/api/goctopus/${domain}`, {
        method: 'POST'
      })
      .then(async (res)=> {
        setResults([...results,await res.clone().text()])
      })
    }
    setResultsFx()
    }
  },[domain]) */
  useEffect(() => {
    console.log(results)
  },[results])
  return (
    <section>
      <TestForm onSubmit={handleSubmit}/>
      <ResultsOutputs results={results}/>
    </section>
  );
}
