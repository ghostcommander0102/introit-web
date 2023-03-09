export default function htmlRenderer(content) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
