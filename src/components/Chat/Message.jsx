import { faSmile, faReply } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react/headless";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Message(props) {
  return (
    <>
      {props.type === "recived" ? (
        <Tippy
          interactive="true"
          placement="right"
          render={(attrs) => (
            <div
              {...attrs}
              className=" h-9 flex items-center text-white  p-3 rounded-xl bg-slate-900 bg-opacity-20 backdrop-blur-lg gap-3 tooltip"
            >
              <FontAwesomeIcon
                icon={faSmile}
                className="hover:text-indigo-500 duration-300 cursor-pointer"
              />
              <FontAwesomeIcon
                icon={faReply}
                className="hover:text-indigo-500 duration-300 cursor-pointer"
              />
            </div>
          )}
        >
          <div className="w-fit max-w-sm rounded-3xl rounded-bl-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message-recived">
            <p className="break-all p-4 w-fit max-w-[15rem] md:w-auto md:max-w-sm">
              Paragraphs are the building blocks of papers. Many students define
              paragraphs in terms of length: a paragraph is a group of at least
              five sentences, a paragraph is half a page long, etc. In reality,
              though, the unity and coherence of ideas among sentences is what
              constitutes a paragraph. A paragraph is defined as “a group of
              sentences or a single sentence that forms a unit” (Lunsford and
              Connors 116). Length and appearance do not determine whether a
              section in a paper is a paragraph. For instance, in some styles of
              writing, particularly journalistic styles, a paragraph can be just
              one sentence long. Ultimately, a paragraph is a sentence or group
              of sentences that support one main idea. In this handout, we will
              refer to this as the “controlling idea,” because it controls what
              happens in the rest of the paragraph.
            </p>
          </div>
        </Tippy>
      ) : (
        <Tippy
          placement="left-end"
          render={(attrs) => (
            <div
              {...attrs}
              className="h-9 flex items-center text-white  p-3 rounded-xl bg-slate-900 bg-opacity-60 backdrop-blur-lg gap-3 tooltip"
            >
              <p>20:20</p>
            </div>
          )}
        >
          <Tippy
            placement="left"
            interactive="true"
            render={(attrs) => (
              <div
                {...attrs}
                className=" h-9 flex items-center text-white  p-3 rounded-xl bg-slate-900 bg-opacity-20 backdrop-blur-lg gap-3 tooltip"
              >
                <FontAwesomeIcon
                  icon={faSmile}
                  className="hover:text-indigo-500 duration-300 cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faReply}
                  className="hover:text-indigo-500 duration-300 cursor-pointer"
                />
              </div>
            )}
          >
            <div className="w-fit max-w-sm rounded-3xl rounded-br-none bg-slate-900 dark:bg-opacity-50 backdrop-blur-lg text-white flex items-center message-send self-end ">
              <p className=" break-all p-4 w-fit max-w-[15rem] md:w-auto md:max-w-sm">
                Paragraphs are the building blocks of papers. Many students
                define paragraphs in terms of length: a paragraph is a group of
                at least five sentences, a paragraph is half a page long, etc.
                In reality, though, the unity and coherence of ideas among
                sentences is what constitutes a paragraph. A paragraph is
                defined as “a group of sentences or a single sentence that forms
                a unit” (Lunsford and Connors 116). Length and appearance do not
                determine whether a section in a paper is a paragraph. For
                instance, in some styles of writing, particularly journalistic
                styles, a paragraph can be just one sentence long. Ultimately, a
                paragraph is a sentence or group of sentences that support one
                main idea. In this handout, we will refer to this as the
                “controlling idea,” because it controls what happens in the rest
                of the paragraph.
              </p>
            </div>
          </Tippy>
        </Tippy>
      )}
    </>
  );
}
