type Props = {
  endpoints: string[];
};

export function Endpoints({ endpoints }: Props) {
  return (
    <section>
      <ul>
        {endpoints.map((endpoint) => (
          <li>{endpoint}</li>
        ))}
      </ul>
    </section>
  );
}
