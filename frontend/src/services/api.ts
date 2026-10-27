export type PingResponse = {
    status: string;
    mensagem: string;
    db_test: unknown;
};

export async function pingServer(): Promise<PingResponse> {
    const response = await fetch('http://localhosst:3000/api/ping');

    if (!response.ok) {
        throw new Error(`Erro HTTP ${response.status}`);
    }
    return response.json() as Promise<PingResponse>;
}