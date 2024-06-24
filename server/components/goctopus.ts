import { spawn } from 'node:child_process';
import type { Response } from 'express';

export async function goctopus(response: Response): Promise<void> {
  const domain = 'lego.com';

  const endpointList = spawn('goctopus', ['-a', `${domain}`]);

  endpointList.stderr.on('data', function (data: Buffer) {
    response.write(data.toString());
  });
  endpointList.on('close', () => {
    response.end();
  });
}
