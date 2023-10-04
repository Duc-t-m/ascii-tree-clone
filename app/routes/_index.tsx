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
    <div className="h-screen w-screen bg-slate-600 p-10">
      <CopyToClipboard />
      <TreeNode />
    </div>
  );
}
