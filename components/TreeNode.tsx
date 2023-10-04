import { useState } from "react";

type Node = {
    id: number;
    name: string;
    level: number;
    handleDelete?: (deleteIndex: number) => () => void;
    children: Node[];
}

export function TreeNode({ root }: { root?: Node }) {
    const [node, setNode] = useState<Node>(
        root ||
        {
            id: 0,
            name: "root",
            level: 0,
            children: []
        }
    );

    const handleAddChild = () => {
        setNode({
            ...node,
            children: [...node.children, {
                id: node.children.length,
                name: "newChildNode",
                level: node.level + 1,
                children: [],
                handleDelete: deleteChild
            }]
        });
    }

    const deleteChild = (deleteIndex: number) => () => {
        setNode(node => {
            return {
                ...node,
                children: node.children.filter(child => child.id != deleteIndex)
            }
        });
    };

    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(node.name);

    const editThis = () => {
        if (editing)
            setNode({ ...node, name: newName });
        setEditing(!editing);
    }

    function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter")
            editThis();
    }

    const [showButton, setShowButton] = useState(false);
    let tab: string = "\xa0".repeat(node.level * 4);

    return (
        <>
            <div className="mb-4 w-full"
                onMouseEnter={() => setShowButton(true)}
                onMouseLeave={() => setShowButton(false)}>
                <span className="text-white font-bold font-mono mr-4 node">
                    {tab}{editing
                        ? <input type="text" className="bg-slate-400"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            onKeyDown={handleEnter}
                            autoFocus
                        ></input>
                        : node.name}
                </span>
                {showButton &&
                    <span className="inline-flex align-middle gap-2">
                        <button type="button" className="bg-transparent hover:bg-slate-700 text-white rounded px-2"
                            onClick={handleAddChild}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M3.75 3A1.75 1.75 0 002 4.75v10.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 
                                    1.75 0 0018 15.25v-8.5A1.75 1.75 0 0016.25 5h-4.836a.25.25 0 01-.177-.073L9.823 3.513A1.75 1.75 0 
                                    008.586 3H3.75zM10 8a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 
                                    0 010-1.5h1.5v-1.5A.75.75 0 0110 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <button type="button" className="bg-transparent hover:bg-slate-700 text-white rounded mx-1 px-2"
                            onClick={editThis}
                        >
                            {editing ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 
                                011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 
                                6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                    <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 
                                2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 
                                0-1.25-.56-1.25-1.25v-9.5z" />
                                </svg>
                            }
                        </button>
                        {node.level != 0 &&
                            <button type="button" className="bg-transparent hover:bg-slate-700 text-white rounded mx-1 px-2"
                                onClick={node.handleDelete!(node.id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                    <path fillRule="evenodd" d="M2 4.75C2 3.784 2.784 3 3.75 3h4.836c.464 0 .909.184 1.237.513l1.414 
                                    1.414a.25.25 0 00.177.073h4.836c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0116.25 17H3.75A1.75 1.75 
                                    0 012 15.25V4.75zm10.25 7a.75.75 0 000-1.5h-4.5a.75.75 0 000 1.5h4.5z" clipRule="evenodd" />
                                </svg>
                            </button>
                        }
                    </span>
                }
            </div>
            {node.children?.map((child) => (
                <TreeNode root={child} key={child.id} />
            ))}
        </>
    );
}