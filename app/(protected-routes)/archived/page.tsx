import { notesByUser, tagsByUser } from "@/server-actions/notes";
import CreateNoteButton from "../components/CreateNoteButton";
import NotePage from "../components/NotePage";
import NoteSettings from "../components/NoteSettings";
import NotesList from "../components/NotesList";

interface ArchivedPageProps {
    searchParams: Promise<{
        noteId?: string;
    }>;
}

export default async function ArchivedPage({ searchParams }: ArchivedPageProps) {
    const searchParamsValue = await searchParams;
    const { noteId } = searchParamsValue;

    const userNotes = await notesByUser({isArchived: true});
    const userTags = await tagsByUser();

    const note = noteId
        ? userNotes.find((i) => i.id == parseInt(noteId))
        : null;

    return (
        <div className="text-foreground flex h-full lg:px-8">
            <div
                className={`${
                    !!noteId ? "hidden" : "flex flex-col gap-4"
                } w-full lg:flex lg:flex-col lg:gap-4 lg:w-[290px] lg:border-r-[1px]`}
            >
                <span className="text-preset-1 text-foreground lg:hidden">
                    Archived Notes
                </span>
                <div className="flex flex-col gap-4 lg:py-5 lg:pr-4">
                    <div className="hidden lg:block">
                        <CreateNoteButton />
                    </div>
                    <span className="text-preset-5 text-neutral-700">
                      All your archived notes are stored here. You can restore or delete them anytime.
                    </span>
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
