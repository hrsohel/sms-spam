import { NextResponse } from "next/server";
import { spawn } from "child_process";

export async function POST(req) {
  const body = await req.formData();
  const pythonDir = `${process.cwd()}/app/ML-model`;

  // Create a promise to wait for the Python process to complete
  const pythonProcessPromise = new Promise((resolve, reject) => {
    const pythonProcess = spawn("python", [
      `${process.cwd()}/app/ML-model/app.py`,
      pythonDir,
      body.get("text"),
    ]);

    let spam = "";

    pythonProcess.stdout.on("data", (data) => {
      spam += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Error: ${data}`);
      reject(data.toString());
    });

    pythonProcess.on("close", (code) => {
      console.log(`Python process exited with code ${code}`);
      resolve(spam);
    });
  });

  try {
    // Wait for the Python process to complete
    const spamResult = await pythonProcessPromise;
    // Return the response after the Python process completes
    return NextResponse.json({ message: Number(spamResult) });
  } catch (error) {
    // Handle errors if the Python process fails
    console.error(error);
    return NextResponse.error();
  }
}
