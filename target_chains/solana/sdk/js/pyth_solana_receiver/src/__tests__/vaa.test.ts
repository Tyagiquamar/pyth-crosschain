import { PublicKey } from "@solana/web3.js";

import { findEncodedVaaAccountsByWriteAuthority } from "../vaa";

it("findEncodedVaaAccountsByWriteAuthority requests zero-length account data", async () => {
  const writeAuthority = PublicKey.unique();
  const wormholeProgramId = PublicKey.unique();
  const encodedVaa = PublicKey.unique();

  const getProgramAccounts = jest.fn().mockResolvedValue([
    { account: { data: Buffer.alloc(0), executable: false, lamports: 0, owner: wormholeProgramId }, pubkey: encodedVaa },
  ]);

  const connection = { getProgramAccounts } as unknown as import("@solana/web3.js").Connection;

  const result = await findEncodedVaaAccountsByWriteAuthority(
    connection,
    writeAuthority,
    wormholeProgramId,
  );

  expect(result).toEqual([encodedVaa]);
  expect(getProgramAccounts).toHaveBeenCalledWith(
    wormholeProgramId,
    expect.objectContaining({
      dataSlice: { length: 0, offset: 0 },
    }),
  );
});
