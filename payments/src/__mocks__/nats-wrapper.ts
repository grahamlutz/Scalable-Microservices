// This mock implementation of the natsWrapper is used to simulate the behavior of the NATS client in tests.
// The publish method is mocked using jest.fn() to avoid actual network calls and to provide a controlled environment for testing.
// The mockImplementation ensures that the callback function is called immediately, simulating a successful publish event.
export const natsWrapper = {
    client: {
        publish: jest.fn().mockImplementation((subject: string, data: string, callback: () => void) => {
            callback();
        })
    }
}