interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_ENV: string;
  readonly NG_APP_API_URL: string;
  readonly NG_APP_STRAVA_CLIENT_ID: string;
  readonly NG_APP_STRAVA_AUTHORIZE_URL: string;
}
