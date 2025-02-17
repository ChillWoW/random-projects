"use client";

import { useEffect, useState } from "react";
import "./style.css";
import { Button, TextInput } from "@/components/ui";
import { QRCode } from "react-qrcode-logo";
import Logo from "@/components/logo.png";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [generated, setGenerated] = useState<boolean>(false);

  useEffect(() => {
    setGenerated(false);
  }, [input]);

  return (
    <div className="wrapper">
      <div className="content-container">
        <div className="input-container w-full">
          <TextInput
            placeholder="Enter your text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
          />
          <Button
            onClick={() => {
              setGenerated(true);
            }}
            className="flex-1"
          >
            Generate QR Code
          </Button>
        </div>
        {generated && (
          <div className="qr-container">
            <QRCode
              value={input}
              logoImage={Logo.src}
              logoWidth={100}
              logoHeight={100}
              logoOpacity={0.9}
            />
          </div>
        )}
      </div>
    </div>
  );
}
