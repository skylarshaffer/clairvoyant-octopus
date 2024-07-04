import { useEffect, useState } from 'react';

type Props = {
  endpoint: string;
};

export function CrawlSchema({ endpoint }: Props) {
  const [results, setResults] = useState([] as string[]);
  useEffect(() => {
    const es = new EventSource(`/api/clairvoyance/${endpoint}`);
    let endpointResults = ['Loading...'];
    setResults(endpointResults);
    es.onmessage = (e) => {
      const eData: string = e.data.toString();
      if (eData.includes('Task exception was never retrieved')) {
        endpointResults = [
          'This endpoint is secure. Schema introspection is disabled and field suggestion is not fully enabled or limited.',
        ];
        es.close();
      } else if (endpointResults.includes('Loading...')) {
        endpointResults = [eData];
      } else {
        endpointResults = [...endpointResults, eData];
      }
      setResults(endpointResults);
    };
    es.onerror = () => {
      console.log('closing eventSource');
      es.close();
    };
    es.addEventListener('close', () => {
      return;
    });
  }, []);

  return (
    <section>
      <h2>{endpoint}</h2>
      <div>
        {results.map((result) => (
          <p>{result}</p>
        ))}
      </div>
    </section>
  );
}
