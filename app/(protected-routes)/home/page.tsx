import { notesByUser, tagsByUser } from "@/server-actions/notes";
import CreateNoteButton from "../components/CreateNoteButton";
import NotePage from "../components/NotePage";
import NoteSettings from "../components/NoteSettings";
import NotesList from "../components/NotesList";

interface HomePageProps {
    searchParams: Promise<{
        noteId?: string;
    }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
    const searchParamsValue = await searchParams;
    const { noteId } = searchParamsValue;

    const userNotes = await notesByUser({});
    const userTags = await tagsByUser();

    const note = noteId
        ? userNotes.find((i) => i.id == parseInt(noteId))
        : null;

    return (
        <div className="h-full text-foreground flex lg:px-8">
            <div
                className={`
                    ${!!noteId ? "hidden" : "flex flex-col gap-4"}
                    w-full h-full lg:flex lg:flex-col lg:gap-4 lg:w-[290px] lg:border-r-[1px]`}
            >
                <span className="text-preset-1 text-foreground lg:hidden">
                    All Notes
                </span>
                <div className="flex flex-col gap-4 lg:py-5 lg:pr-4 h-full overflow-y-scroll scrollbar-hide">
                    <div className="hidden lg:block">
                        <CreateNoteButton />
                    </div>
                    <NotesList notes={userNotes} />
                </div>
            </div>

            {!!noteId && (
                <div className="flex-1">
                    <NotePage note={note} tags={userTags} />
                </div>
            )}

            {!!noteId && (
                <div className="hidden lg:flex w-[290px]">
                    <NoteSettings />
                </div>
            )}

            <div
                className={`${
                    !!noteId ? "hidden" : ""
                } lg:hidden absolute right-0 bottom-0 mr-4 mb-4`}
            >
                <CreateNoteButton />
            </div>
        </div>
    );
}
