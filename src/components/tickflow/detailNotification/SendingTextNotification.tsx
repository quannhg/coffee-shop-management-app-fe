import { useState, useCallback, useMemo, useEffect } from 'react';
import { Editable, withReact, Slate, RenderElementProps, RenderLeafProps } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import {
  Button,
  Progress,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
  Typography
} from '@material-tailwind/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  EyeIcon,
  PaperAirplaneIcon,
  PencilIcon
} from '@heroicons/react/24/outline';
import { EditorElement, EditorLeaf, EditorToolbar } from '@components/tickflow';
import {
  NOTIFICATION_MEDIA_TAB,
  NUMBER_OF_STEP_SENDING_NOTIFICATION,
  ScreenSize,
  PROCESSOR
} from '@constants';
import { useScreenSize } from '@hooks';
import { useFormData, useNotificationDetailStore, useDiscordRecipientsStore } from '@states';
import {
  handleEditorHotkeys,
  withShortcuts,
  withLinks,
  convertUnixTimeInContent,
  convertDiscordTimestamp,
  discordTimeTransformer,
  convertIdToUsername,
  convertUsernameToId,
  discordUserTransformer,
  serialize
} from '@utils';

export function SendingTextNotification() {
  const {
    templateId,
    markdown,
    editedMarkdown,
    fields,
    discord,
    setOpenNotiDialog,
    setEditedMarkdown,
    previewNotification,
    sendNotification
  } = useFormData();
  const { memberList } = useDiscordRecipientsStore();

  const [editorValue, setEditorValue] = useState<Descendant[]>(
    PROCESSOR.processSync(markdown).result as Descendant[]
  );

  const { screenSize } = useScreenSize();
  const { mediaTab, sendingStep, editorReadOnly, setSendingStep, setMediaTab, setEditorReadOnly } =
    useNotificationDetailStore();

  useEffect(() => {
    setEditorValue(PROCESSOR.processSync(markdown).result as Descendant[]);
  }, [markdown]);

  useEffect(() => {
    if (sendingStep === 3) {
      const { discordTimestamp, discordToLongDay } = discordTimeTransformer(markdown);
      const TIME_TRANSFORM_CONTENT = convertUnixTimeInContent(
        markdown,
        discordTimestamp,
        discordToLongDay
      );
      const { discordMention, discordMentionToUsername } = discordUserTransformer(
        markdown,
        memberList
      );
      const DISCORD_ID_TRANSFORM_CONTENT = convertIdToUsername(
        TIME_TRANSFORM_CONTENT,
        discordMention,
        discordMentionToUsername
      );
      setEditorValue(PROCESSOR.processSync(DISCORD_ID_TRANSFORM_CONTENT).result as Descendant[]);
    }
  }, [sendingStep, markdown, memberList]);

  const handleSendNotification = useMemo(
    () => async () => {
      const { longDayFormat, longDayToDiscord } = discordTimeTransformer(markdown);
      const { discordUsername, discordUsernameToMention } = discordUserTransformer(
        markdown,
        memberList
      );
      const result = editorValue.map((v) => serialize(v)).join('');
      const TIME_REVERSE_TRANSFORM_CONTENT = convertDiscordTimestamp(
        result,
        longDayFormat,
        longDayToDiscord
      );
      const DISCORD_ID_REVERSE_TRANSFORM_CONTENT = convertUsernameToId(
        TIME_REVERSE_TRANSFORM_CONTENT,
        discordUsername,
        discordUsernameToMention
      );
      await sendNotification({
        markdown: DISCORD_ID_REVERSE_TRANSFORM_CONTENT,
        channelIds: discord.channelId.map((channel) => channel.id)
      });
      setOpenNotiDialog(true);
    },
    [editorValue, markdown, memberList, discord.channelId, sendNotification, setOpenNotiDialog]
  );

  const renderElement = useCallback(
    (props: RenderElementProps) => <EditorElement {...props} />,
    []
  );
  const renderLeaf = useCallback((props: RenderLeafProps) => <EditorLeaf {...props} />, []);

  const editor = useMemo(
    () => withLinks(withShortcuts(withHistory(withReact(createEditor())))),
    []
  );

  return (
    <div className='h-full flex flex-col justify-between'>
      <Slate
        editor={editor}
        initialValue={editorValue}
        onChange={(value) => setEditorValue(value)}
        key={JSON.stringify(editorValue)}
      >
        {editorReadOnly === false ? (
          <>
            <div className='bg-teal-50 text-teal-500 flex items-center justify-center gap-2 p-2'>
              <PencilIcon strokeWidth={2} className='w-5 h-5' />
              <span className='font-semibold'>Editing</span>
            </div>
            <>
              <EditorToolbar />
              <Editable
                readOnly={editorReadOnly}
                spellCheck='false'
                autoComplete='off'
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                placeholder='Enter some rich text…'
                className='h-[27rem] overflow-y-auto w-full pl-5 rounded-md bg-transparent disabled:cursor-not-allowed disabled:opacity-80 outline-none'
                onKeyDown={(event) => handleEditorHotkeys(event, editor)}
              />
            </>
          </>
        ) : (
          <div className='grid gap-2'>
            <div className='bg-teal-50 text-teal-500 flex items-center justify-center gap-2 p-2'>
              <EyeIcon strokeWidth={2} className='w-5 h-5' />
              <span className='font-semibold'>View Only</span>
            </div>
            <Tabs value={mediaTab} className='max-w-[70rem] divide-y-4 divide-teal-500'>
              <TabsHeader
                className='bg-transparent w-fit p-0'
                indicatorProps={{
                  className: 'shadow-none'
                }}
              >
                {NOTIFICATION_MEDIA_TAB.map((tab, index) => (
                  <Tab
                    key={index}
                    value={tab}
                    className='p-0 font-medium'
                    onClick={() => setMediaTab(tab)}
                  >
                    <Button
                      color={mediaTab === tab ? 'teal' : 'gray'}
                      variant={mediaTab === tab ? 'filled' : 'text'}
                      className={
                        'rounded-b-none rounded-t-2xl normal-case text-base px-12 py-2 ' +
                        (mediaTab === tab ? '' : 'text-gray-600 bg-gray-200 hover:bg-gray-300')
                      }
                    >
                      {tab}
                    </Button>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                <TabPanel value={NOTIFICATION_MEDIA_TAB[0]}>A</TabPanel>
                <TabPanel value={NOTIFICATION_MEDIA_TAB[1]} className='text-black font-normal !p-0'>
                  <Editable
                    readOnly={editorReadOnly}
                    spellCheck='false'
                    autoComplete='off'
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    className='h-[27rem] overflow-y-auto w-full pl-5 bg-transparent disabled:cursor-not-allowed disabled:opacity-80 outline-none'
                    onKeyDown={(event) => handleEditorHotkeys(event, editor)}
                  />
                </TabPanel>
              </TabsBody>
            </Tabs>
          </div>
        )}
      </Slate>
      <div className='flex items-center justify-between lg:justify-end mb-2 mx-2'>
        <div className='flex gap-1'>
          {screenSize <= ScreenSize.MD ? (
            <Button
              variant='text'
              color='teal'
              className='flex items-center rounded-full bg-teal-50 hover:bg-teal-100 w-32'
              onClick={() => {
                if (editorReadOnly === false) {
                  setSendingStep(1);
                } else {
                  setEditorValue(PROCESSOR.processSync(editedMarkdown).result as Descendant[]);
                  setSendingStep(2);
                  setEditorReadOnly(false);
                }
              }}
            >
              <ChevronLeftIcon strokeWidth={3} className='w-4 h-4' />
              <span className='normal-case text-sm'>Quay lại</span>
            </Button>
          ) : (
            <Button
              variant='text'
              color='teal'
              className='flex items-center rounded-full bg-teal-50 hover:bg-teal-100 w-32'
              onClick={async () => {
                if (editorReadOnly === false) {
                  const editedMarkdown = editorValue.map((v) => serialize(v)).join('');
                  setEditedMarkdown(editedMarkdown);
                  await previewNotification(templateId, {
                    formFields: fields,
                    markdown: editedMarkdown
                  });
                  setSendingStep(3);
                  setEditorReadOnly(true);
                } else {
                  setEditorValue(PROCESSOR.processSync(editedMarkdown).result as Descendant[]);
                  setSendingStep(2);
                  setEditorReadOnly(false);
                }
              }}
            >
              {editorReadOnly === false ? (
                <>
                  <EyeIcon strokeWidth={2} className='w-5 h-5' />
                  <span className='normal-case text-sm'>Preview</span>
                </>
              ) : (
                <>
                  <PencilIcon strokeWidth={2} className='w-5 h-5' />
                  <span className='normal-case text-sm'>Edit</span>
                </>
              )}
            </Button>
          )}
          {editorReadOnly === false ? (
            <>
              {screenSize <= ScreenSize.MD ? (
                <Button
                  variant='text'
                  color='teal'
                  className='flex items-center rounded-full bg-teal-50 hover:bg-teal-100 w-32'
                  onClick={async () => {
                    const editedMarkdown = editorValue.map((v) => serialize(v)).join('');
                    setEditedMarkdown(editedMarkdown);
                    await previewNotification(templateId, {
                      formFields: fields,
                      markdown: editedMarkdown
                    });
                    setSendingStep(3);
                    setEditorReadOnly(true);
                  }}
                >
                  <span className='normal-case text-sm'>Tiếp tục</span>
                  <ChevronRightIcon strokeWidth={3} className='w-4 h-4' />
                </Button>
              ) : (
                <Button
                  color='teal'
                  className='flex items-center rounded-full hover:bg-teal-600 w-32'
                  onClick={handleSendNotification}
                >
                  <span className='normal-case text-sm'>Gửi ngay</span>
                  <PaperAirplaneIcon strokeWidth={3} className='w-4 h-4' />
                </Button>
              )}
            </>
          ) : (
            <Button
              color='teal'
              className='flex items-center rounded-full hover:bg-teal-600 w-32'
              onClick={handleSendNotification}
            >
              <span className='normal-case text-sm'>Gửi ngay</span>
              <PaperAirplaneIcon strokeWidth={3} className='w-4 h-4' />
            </Button>
          )}
        </div>
        {screenSize <= ScreenSize.MD && (
          <div className='flex flex-col items-end'>
            <Typography variant='small' color='gray' className='font-semibold sm:text-2xl'>
              {sendingStep} of {NUMBER_OF_STEP_SENDING_NOTIFICATION}
            </Typography>
            <Progress
              size='sm'
              value={(sendingStep / NUMBER_OF_STEP_SENDING_NOTIFICATION) * 100}
              className='w-20'
            />
          </div>
        )}
      </div>
    </div>
  );
}
