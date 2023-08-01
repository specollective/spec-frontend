import { createMocks } from 'node-mocks-http';
import contactFormAPIHandle from 'pages/api/contact';

describe('/api/contact', () => {
  test('returns a message with the specified animal', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      body: {
        fullName: 'Person Name',
        email: 'person@email.com',
        message: 'This is a message',
        reason: 'reason',
      },
    });

    await contactFormAPIHandle(req, res);

    expect(res._getStatusCode()).toBe(201);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        data: 'Person Name person@email.com reason This is a message',
      }),
    );
  });
});