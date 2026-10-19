import { promises as fs } from "fs";
import path from "path";

const DIR = path.join(process.cwd(), "data");

/** Appends a record to data/<file> (a JSON array). Works on a normal server or locally; NOT on read-only hosts such as Vercel. */
export async function appendRecord(file: string, record: unknown) {
  await fs.mkdir(DIR, { recursive: true });
  const p = path.join(DIR, file);

  let list: unknown[] = [];
  try {
    const parsed = JSON.parse(await fs.readFile(p, "utf8"));
    if (!Array.isArray(parsed)) throw new Error("Storage file is corrupted");
    list = parsed;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code !== "ENOENT") throw err;
  }

  list.push(record);
  await fs.writeFile(p, JSON.stringify(list, null, 2), "utf8");
}