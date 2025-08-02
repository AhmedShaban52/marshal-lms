import { requireAdmin } from "@/app/data/admin/require-admin";
import arcjet, { detectBot, fixedWindow } from "@/lib/arcjet";
import { auth } from "@/lib/auth";
import { S3 } from "@/lib/S3Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const aj = arcjet
  .withRule(
    detectBot({
      mode: "LIVE",
      allow: [],
    })
  )
  .withRule(
    fixedWindow({
      mode: "LIVE",
      window: "1m",
      max: 5, // limit of requests per window in 1 minute
    })
  );

export async function DELETE(request: Request) {
  // const session = await requireAdmin()
  try {
    // const decision = await aj.protect(request, {
    //   fingerprint: session?.user?.id as string,
    // });

    // if (decision.isDenied()) {
    //   return NextResponse.json({ error: "dudde not good" }, { status: 429 });
    // }

    const body = await request.json();

    const key = body.key;

    if (!key) {
      return NextResponse.json(
        { error: "Missing or invalid object key" },
        { status: 400 }
      );
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES as string,
      Key: key,
    });

    await S3.send(command);

    return NextResponse.json(
      { message: "file deleted succesfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Missing or invalid object key" },
      { status: 500 }
    );
  }
}
