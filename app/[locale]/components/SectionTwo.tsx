import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import square from "../../../public/me-2.jpg";
import android from "../../../public/tech-icons/android.svg";
import aws from "../../../public/tech-icons/aws.svg";
import bitbucket from "../../../public/tech-icons/bitbucket.svg";
import clerk from "../../../public/tech-icons/clerk.svg";
import css from "../../../public/tech-icons/css.svg";
import drawio from "../../../public/tech-icons/drawio.svg";
import firebase from "../../../public/tech-icons/firebase.svg";
import flutter from "../../../public/tech-icons/flutter.svg";
import git from "../../../public/tech-icons/git.svg";
import github from "../../../public/tech-icons/github.svg";
import gitlab from "../../../public/tech-icons/gitlab.svg";
import googlecloud from "../../../public/tech-icons/google-cloud.svg";
import googlegemini from "../../../public/tech-icons/google-gemini.svg";
import gradle2 from "../../../public/tech-icons/gradle2.svg";
import graphql from "../../../public/tech-icons/graphql.svg";
import ios from "../../../public/tech-icons/ios.svg";
import java from "../../../public/tech-icons/java.svg";
import js from "../../../public/tech-icons/js.svg";
import json from "../../../public/tech-icons/json.svg";
import kotlin from "../../../public/tech-icons/kotlin.svg";
import make from "../../../public/tech-icons/make.svg";
import neon from "../../../public/tech-icons/neon.svg";
import next from "../../../public/tech-icons/next.svg";
import nginx from "../../../public/tech-icons/nginx.svg";
import ngrok from "../../../public/tech-icons/ngrok.svg";
import node from "../../../public/tech-icons/node.svg";
import npm from "../../../public/tech-icons/npm.svg";
import openai from "../../../public/tech-icons/openai.svg";
import pgsql from "../../../public/tech-icons/pgsql.svg";
import prisma from "../../../public/tech-icons/prisma.svg";
import reactjs from "../../../public/tech-icons/react-js.svg";
import sanity from "../../../public/tech-icons/sanity.svg";
import supabase from "../../../public/tech-icons/supabase.svg";
import swift from "../../../public/tech-icons/swift.svg";
import typescript from "../../../public/tech-icons/typescript.svg";
import vercel from "../../../public/tech-icons/vercel.svg";
import vscode from "../../../public/tech-icons/vscode.svg";

import { Button } from "@/components/ui/button";
import insta from "../../../public/insta.svg";

const icons = [
  next,
  android,
  aws,
  bitbucket,
  css,
  drawio,
  firebase,
  flutter,
  googlecloud,
  graphql,
  java,
  js,
  googlegemini,
  json,
  kotlin,
  ngrok,
  neon,
  node,
  clerk,
  gitlab,
  pgsql,
  reactjs,
  sanity,
  supabase,
  swift,
  typescript,
  git,
  nginx,
  npm,
  vscode,
  gradle2,
  vercel,
  prisma,
  openai,
  ios,
  make,
];

const socialMedia = [
  {
    id: 1,
    icon: github,
    name: "GitHub",
    username: "@jggjosue",
    link: "https://github.com/jggjosue",
  },
  {
    id: 1,
    icon: insta,
    name: "Instagram",
    username: "@ai.joshuesito",
    link: "https://www.instagram.com/ai.joshuesito/",
  },
  /*{
    id: 2,
    icon: twitter,
    name: "X / Twitter",
    username: "@joshueesito",
    link: "https://x.com/joshueesito",
  },
  {
    id: 3,
    icon: linkedin,
    name: "Linkedin",
    username: "@josue-g",
    link: "https://www.linkedin.com/in/josue-g-39787310a/",
  },*/
];

export function SectionTwo() {
  return (
    <div className="grid gird-cols-1 lg:grid-cols-3 gap-4 mt-10">
      <div className="w-full relative col-span-1">
        <Image
          src={square}
          alt="square"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="flex flex-col w-full col-span-1 lg:col-span-2 gap-4">
        {/*className="bg-gray-100 border-none"*/}
        <Card>
          <CardHeader>
            <CardTitle>Explore my stack</CardTitle>
            <CardDescription>Check out the tools I use daily, visit my GitHub and download the projects you like</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {icons.map((item, index) => (
              <Image key={index} src={item} alt="Icon" className="w-16 h-16" />
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-4">
          {socialMedia.map((item) => (
              /*bg-gray-100 border-none*/
            <Card
              key={item.id}
              className="p-4 flex flex-col items-center sm:items-start"
            >
              <Image src={item.icon} alt="Icon" className="w-16 h-16" />
              <h1 className="text-2xl font-medium pt-3">{item.name}</h1>
              <p className="text-muted-foreground">{item.username}</p>
              <Button className="mt-4" size="sm" asChild>
                <a href={item.link} target="_blank">Follow</a>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
