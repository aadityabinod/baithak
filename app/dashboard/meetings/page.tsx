import { cancelMeetingAction } from "@/app/actions";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
import { SubmitButton } from "@/app/components/SubmitButton";
import { auth } from "@/app/lib/auth";
import { nylas } from "@/app/lib/nylas";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import prisma from "@/lib/prisma";
import { format, fromUnixTime } from "date-fns";
import { Video } from "lucide-react";

import React from "react";

// --- Type Definitions ---

interface WhenTime {
  time: number;
}
interface WhenTimespan {
  start_time: number;
  end_time: number;
}
interface WhenDate {
  date: string;
  end_date?: string;
}
type When = WhenTime | WhenTimespan | WhenDate;

interface ConferencingDetails {
  meeting_code?: string;
  url?: string;
  password?: string;
  pin?: string;
  [key: string]: unknown;
}

interface Conferencing {
  details?: ConferencingDetails;
  provider?: string;
  [key: string]: unknown;
}
interface Participant {
  name: string;
  [key: string]: unknown;
}

interface EventItem {
  id: string;
  title?: string;
  when: When;
  conferencing: Conferencing; // Make this required to match Nylas Event type
  participants: Participant[];
  [key: string]: unknown;
}

interface NylasEventsListResponse {
  data: EventItem[];
}

// --- Helper Functions ---

function getStartTimestamp(when: When): number | undefined {
  if ("start_time" in when && typeof when.start_time === "number") return when.start_time;
  if ("time" in when && typeof when.time === "number") return when.time;
  if ("date" in when && typeof when.date === "string") return Date.parse(when.date) / 1000;
  return undefined;
}

function getEndTimestamp(when: When): number | undefined {
  if ("end_time" in when && typeof when.end_time === "number") return when.end_time;
  if ("time" in when && typeof when.time === "number") return when.time;
  if ("end_date" in when && typeof when.end_date === "string") return Date.parse(when.end_date) / 1000;
  return undefined;
}

function getConferenceUrl(conferencing: Conferencing): string | undefined {
  return conferencing?.details?.url;
}

// --- Data Fetching ---
interface NylasParticipant {
  name: string;
  [key: string]: unknown;
}

interface NylasConferencingDetails {
  meeting_code?: string;
  url?: string;
  password?: string;
  pin?: string;
  [key: string]: unknown;
}

interface NylasConferencing {
  details?: NylasConferencingDetails;
  provider?: string;
  [key: string]: unknown;
}

interface NylasWhenTime {
  time: number;
}
interface NylasWhenTimespan {
  start_time: number;
  end_time: number;
}
interface NylasWhenDate {
  date: string;
  end_date?: string;
}
type NylasWhen = NylasWhenTime | NylasWhenTimespan | NylasWhenDate;

interface NylasEvent {
  id: string;
  title?: string;
  when: NylasWhen;
  conferencing: NylasConferencing;
  participants: NylasParticipant[];
  [key: string]: unknown;
}

function mapNylasEventToEventItem(nylasEvent: NylasEvent): EventItem {
  return {
    id: nylasEvent.id,
    title: nylasEvent.title,
    when: nylasEvent.when,
    conferencing: nylasEvent.conferencing,
    participants: nylasEvent.participants || []
  };
}

async function getData(userId: string): Promise<NylasEventsListResponse> {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }

  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  return {
    data: ((data.data as unknown) as NylasEvent[]).map(mapNylasEventToEventItem)
  };
}

// --- Component ---

const MeetingsPage = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/dashboard/new"
        />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Bookings</CardTitle>
            <CardDescription>
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {data.data.map((item) => {
              const start = getStartTimestamp(item.when);
              const end = getEndTimestamp(item.when);
              const url = getConferenceUrl(item.conferencing);

              return (
                <form key={item.id} action={cancelMeetingAction}>
                  <input type="hidden" name="eventId" value={item.id} />
                  <div className="grid grid-cols-3 justify-between items-center">
                    <div>
                      <p className="text-muted-foreground text-sm">
                        {start
                          ? format(fromUnixTime(start), "EEE, dd MMM")
                          : "Unknown date"}
                      </p>
                      <p className="text-muted-foreground text-xs pt-1">
                        {start
                          ? format(fromUnixTime(start), "hh:mm a")
                          : "?"}{" "}
                        -{" "}
                        {end
                          ? format(fromUnixTime(end), "hh:mm a")
                          : "?"}
                      </p>
                      <div className="flex items-center mt-1">
                        <Video className="size-4 mr-2 text-primary" />{" "}
                        {url && (
                          <a
                            className="text-xs text-primary underline underline-offset-4"
                            target="_blank"
                            href={url}
                          >
                            Join Meeting
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-start">
                      <h2 className="text-sm font-medium">{item.title ?? "(No title)"}</h2>
                      <p className="text-sm text-muted-foreground">
                        You and {item.participants[0]?.name}
                      </p>
                    </div>
                    <SubmitButton
                      text="Cancel Event"
                      variant="destructive"
                      className="w-fit flex ml-auto"
                    />
                  </div>
                  <Separator className="my-3" />
                </form>
              );
            })}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MeetingsPage;