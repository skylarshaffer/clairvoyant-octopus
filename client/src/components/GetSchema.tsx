import { useEffect, useState } from 'react';

type Props = {
  endpoint: string;
};

export function GetSchema({ endpoint }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>();
  const [result, setResult] = useState('');
  useEffect(() => {
    async function getSchema() {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Connection: 'keep-alive',
            'Accept-Encoding': 'gzip, deflate, br',
          },
          body: JSON.stringify({
            query:
              'query IntrospectionQuery { __schema { queryType { name } mutationType { name } subscriptionType { name } types { ...FullType } directives { name description locations args { ...InputValue } } }}fragment FullType on __Type { kind name description fields(includeDeprecated: true) { name description args { ...InputValue } type { ...TypeRef } isDeprecated deprecationReason } inputFields { ...InputValue } interfaces { ...TypeRef } enumValues(includeDeprecated: true) { name description isDeprecated deprecationReason } possibleTypes { ...TypeRef }}fragment InputValue on __InputValue { name description type { ...TypeRef } defaultValue}fragment TypeRef on __Type { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name ofType { kind name } } } } } } }}',
          }),
        });
        console.log(response);
        const responseJSON = await response.json();
        setResult(JSON.stringify(responseJSON));
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getSchema();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h2>{endpoint}</h2>
        <div>
          <p>Loading...</p>
        </div>
      </section>
    );
  }
  if (error || !result) {
    console.error('Fetch error:', error);
    return (
      <section>
        <h2>{endpoint}</h2>
        <div>
          <p>CORS error. Please check network tab of developer tools.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>{endpoint}</h2>
      <div>
        <p>{result}</p>
      </div>
    </section>
  );
}
