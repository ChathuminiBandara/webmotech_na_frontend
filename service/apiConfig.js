export const URL_REMOTE = process.env.NEXT_PUBLIC_API_URL;
const conf = {
    serverUrl: URL_REMOTE,
    basePath: `api`,
    redirect: process.env.NEXT_REDIRECT,
};
export default conf;

