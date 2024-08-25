import { NextResponse } from 'next/server';
import { VerificationLevel } from "@worldcoin/idkit-core";
import { verifyCloudProof } from "@worldcoin/idkit-core/backend";

export type VerifyReply = {
  success: boolean;
  code?: string;
  attribute?: string | null;
  detail?: string;
};

interface IVerifyRequest {
  proof: {
    nullifier_hash: string;
    merkle_root: string;
    proof: string;
    verification_level: VerificationLevel;
  };
  signal?: string;
}

const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
const action = process.env.NEXT_PUBLIC_WLD_ACTION as string;

async function verify(
  proof: IVerifyRequest["proof"],
  signal?: string
): Promise<VerifyReply> {
  const verifyRes = await verifyCloudProof(proof, app_id, action, signal);
  if (verifyRes.success) {
    return { success: true };
  } else {
    return {
      success: false,
      code: verifyRes.code,
      attribute: verifyRes.attribute,
      detail: verifyRes.detail,
    };
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { proof, signal } = body as IVerifyRequest;

    const result = await verify(proof, signal);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error verifying proof:', error);
    return NextResponse.json(
      { success: false, detail: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
