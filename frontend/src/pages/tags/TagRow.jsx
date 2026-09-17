import Button from "../../components/ui/Button";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTag } from "../../hooks/useTags";

export default function TagRow({ tag, onEdit }) {
  const { id } = useParams();
  const { data: tag } = useTag(id);

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 bg-white px-4 py-3">
      <div>
        <p className="font-medium text-gray-500"> {tag.name}</p>
        <p className="font-medium text-gray-500">
          {" "}
          <Link to="/tags:id">Details</Link>{" "}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => onEdit(tag)}>Edit</Button>
      </div>
    </div>
  );
}
