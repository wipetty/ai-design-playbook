import { AdobeIMS } from "@identity/imslib";
import { type IAdobeIdData } from "@identity/imslib/adobe-id/IAdobeIdData";
import { IEnvironment } from "@identity/imslib/adobe-id/IEnvironment";
import { type ITokenInformation } from "@identity/imslib/adobe-id/custom-types/CustomTypes";
import { IErrorType } from "@identity/imslib/adobe-id/IErrorType";
import { v4 } from "uuid";
import { IMS_CLIENT_ID, IMS_ENV, IMS_SCOPE } from "./IMSConstants";

/**
 * IMS Authentication Singleton
 *
 * ⚠️ WARNING: This file exists in 3 locations:
 * - src/utils/IMS.ts (root template)
 * - examples/react/src/utils/IMS.ts
 * - examples/lit/src/utils/IMS.ts
 *
 * Changes must be synchronized across all copies.
 */

declare global {
  interface Window {
    adobeIMSAuthToken: string;
  }
}

export interface AdobeIMSProfile {
  account_type: string;
  authId: string;
  countryCode: string;
  displayName: string;
  email: string;
  emailVerified: string;
  first_name: string;
  last_name: string;
  mktPerm: string;
  mrktPermEmail?: string;
  name: string;
  phoneNumber?: string;
  preferred_languages?: string;
  userId: string;
  utcOffset?: string;
}

export class Ims {
  // New session ID for each time the app is used
  sessionId = v4();

  // the actual IMS settings
  adobeIMS: AdobeIMS;
  adobeid: IAdobeIdData = {
    client_id: IMS_CLIENT_ID,
    scope: IMS_SCOPE,
    environment: IMS_ENV as IEnvironment,
    locale: "en_US",
    useLocalStorage: true,
    autoValidateToken: true,
    onAccessToken: this.onAccessToken.bind(this),
    onReauthAccessToken: this.onReauthAccessToken.bind(this),
    onError: this.onImsError.bind(this),
    onAccessTokenHasExpired: this.onAccessTokenHasExpired.bind(this),
    onReady: this.onReady.bind(this),
  };

  tokenData?: ITokenInformation = undefined;
  profileData?: AdobeIMSProfile = undefined;

  // Promise that resolves when IMS is ready
  private readyResolve?: () => void;
  ready: Promise<void>;

  constructor(settings: Partial<Ims> = {}) {
    Object.assign(this, settings);

    // Create the ready promise
    this.ready = new Promise<void>((resolve) => {
      this.readyResolve = resolve;
    });

    this.adobeIMS = new AdobeIMS(this.adobeid);
    this.adobeIMS.initialize();
  }

  setTokenData(data?: ITokenInformation) {
    this.tokenData = data;
    window.adobeIMSAuthToken = data?.token ?? "";
  }

  onAccessToken(data: ITokenInformation) {
    this.setTokenData(data);
    this.adobeIMS
      .getProfile()
      .then((data) => this.setProfileData(data))
      .catch((err) => console.error("Failed to fetch IMS profile:", err));
  }

  onReauthAccessToken(data: ITokenInformation) {
    this.setTokenData(data);
    // Token refreshed
  }

  onImsError(type: IErrorType, message: unknown) {
    console.error(type, message);
  }

  onAccessTokenHasExpired() {
    // Token expired, triggering sign-in
    this.setTokenData(undefined);
    this.adobeIMS.signIn();
  }

  onReady() {
    // IMS initialized
    // Resolve the ready promise
    if (this.readyResolve) {
      this.readyResolve();
    }
    // Dispatch event for framework integrations
    window.dispatchEvent(new CustomEvent('imsReady'));
  }

  setProfileData(profileData: unknown) {
    this.profileData = profileData as AdobeIMSProfile;
    // Profile loaded
  }

  signIn() {
    this.adobeIMS.signIn();
  }

  logout() {
    this.adobeIMS.signOut();
  }

  get isAuthenticated(): boolean {
    return !!this.tokenData?.token;
  }

  get token(): string {
    return this.tokenData?.token ?? "";
  }

  get apiKey(): string {
    return this.adobeid.client_id;
  }
}

// create the global singleton for IMS stuff
export const IMS = new Ims();
export default IMS;
