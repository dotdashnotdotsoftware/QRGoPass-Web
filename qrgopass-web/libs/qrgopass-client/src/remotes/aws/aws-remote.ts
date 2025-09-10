import { fetchInterval } from "../../fetch-interval";
import { FailureReason, QRGoPassFailure } from "../../types";
import { IRemote } from "../i-remote";

export class AwsRemote implements IRemote {
    private readonly FETCH_URL = "https://azk4l4g8we.execute-api.us-east-2.amazonaws.com/Prod?UUID=";
    private readonly FETCH_TIMEOUT = 3000;
    private readonly FETCH_ATTEMPTS = 4;

    public readonly timeout = this.FETCH_TIMEOUT * this.FETCH_ATTEMPTS

    constructor(private readonly uuid: string) { }

    public async getResponse(): Promise<any | QRGoPassFailure> {
        try {
            const response = await fetchInterval(
                async () => {
                    const fetchResult = await fetch(this.FETCH_URL + this.uuid, {
                        cache: "no-store",
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                    );

                    const response = await fetchResult.json();
                    if (!response) {
                        return {
                            done: false
                        };
                    } else {
                        return {
                            done: true,
                            result: response
                        }
                    }
                },
                this.FETCH_ATTEMPTS,
                this.FETCH_TIMEOUT
            );

            return response;
        } catch (e) {
            if (e === "TOO_MANY_LOOPS") {
                console.log("(Timeout)");
                return { failureReason: FailureReason.TRANSFER_TIMEOUT };
            }

            console.error("Error fetching remote response", e);
            return { failureReason: FailureReason.UNKNOWN_ERROR };
        }
    }
}