import type { V2_MetaFunction } from "@remix-run/cloudflare";
import { TreeNode } from "../../components/TreeNode";
import { CopyToClipboard } from "components/CopyToClipboard";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Ascii tree clone" },
    { name: "some name", content: "learning remix" },
  ];
};

export default function Index() {
  return (
    <div className="h-fit min-h-screen w-fit min-w-full bg-slate-600 p-10">
      <CopyToClipboard />
      <TreeNode />
    </div>
  );
}
