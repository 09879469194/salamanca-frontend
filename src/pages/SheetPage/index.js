import { useState } from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Sheet from "./Sheet";
import db from "../../config/firebase";
import { useParams } from "react-router-dom";

export default () => {
  const { sheetId } = useParams();

  const [name, setName] = useState("");

  const pollenCollectionRef = collection(db, "sheets", sheetId, "pollens");
  const [pollens, loading, error] = useCollectionData(pollenCollectionRef, {
    idField: "id",
    snapshotOptions: { includeMetadataChanges: true },
  });

  const addPolen = async () => {
    await addDoc(pollenCollectionRef, {
      name: name,
      intervals: {
        _0h: 0,
        _1h: 0,
        _2h: 0,
        _3h: 0,
        _4h: 0,
        _5h: 0,
        _6h: 0,
        _7h: 0,
        _8h: 0,
        _9h: 0,
        _10h: 0,
        _11h: 0,
        _12h: 0,
        _13h: 0,
        _14h: 0,
        _15h: 0,
        _16h: 0,
        _17h: 0,
        _18h: 0,
        _19h: 0,
        _20h: 0,
        _21h: 0,
        _22h: 0,
        _23h: 0,
      },
    });
  };

  const handleCellEditCommit = async (params) => {
    const currentRef = doc(db, "sheets", sheetId, "pollens", params.id);
    await updateDoc(currentRef, {
      [`intervals.${params.field}`]: params.value,
    });
  };

  return (
    <Sheet
      setName={setName}
      pollens={pollens}
      sheetId={sheetId}
      loading={loading}
      addPollen={addPolen}
      handleEdit={handleCellEditCommit}
    />
  );
};
