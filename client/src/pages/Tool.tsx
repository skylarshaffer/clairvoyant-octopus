import { useEffect, useState } from 'react';
import { ResultsOutputs } from '../components/ResultsOutput';
import { TestForm } from '../components/TestForm';
import { Endpoints } from '../components/Endpoints';

export function Tool() {
  const [results, setResults] = useState([] as string[]);
  const [endpoints, setEndpoints] = useState([] as string[]);
  const [domain, setDomain] = useState('');
  const [isReading, setIsReading] = useState(false);
  useEffect(() => {
    if (isReading) {
      const es = new EventSource(`/api/goctopus/${domain}`);
      let endpoints = [''];
      setEndpoints(endpoints);
      let results = ['Loading...'];
      setResults(results);
      es.onmessage = (e) => {
        const eData: string = e.data.toString();
        let eDataMessage = '';
        if (eData.includes('schema_status')) {
          const eDataUnescaped = eData.replace(/\\/g, '');
          console.log(eDataUnescaped);
          const newDomain = eDataUnescaped.split('url":"')[1].split('"}n"')[0];
          if (endpoints.includes('')) {
            endpoints = [newDomain];
          } else {
            endpoints = [...endpoints, newDomain];
          }
          setEndpoints(endpoints);
        }
        if (eData.includes('INF')) {
          eDataMessage = eData.split('[0m]')[1];
        } else if (eData.includes('level=info')) {
          eDataMessage = eData.split('msg=')[1];
        } else eDataMessage = eData;
        if (results.includes('Loading...')) {
          results = [eDataMessage];
        } else {
          results = [...results, eDataMessage];
        }
        setResults(results);
      };
      es.onerror = () => {
        console.log(endpoints);
        console.log('closing eventSource');
        setIsReading(false);
        es.close();
      };
      es.addEventListener('close', () => {
        return;
      });
    }
  }, [isReading]);
  useEffect(() => {
    console.log(endpoints);
  }, [endpoints]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDomain(
      Object.fromEntries(new FormData(event.currentTarget)).domain.toString()
    );
    setIsReading(true);
  }

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
  return (
    <section>
      <TestForm onSubmit={handleSubmit} />
      <ResultsOutputs results={results} />
      <Endpoints endpoints={endpoints} />
    </section>
  );
}
