import React, { useMemo } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { MemoizedParticipantGrid } from "../../components/ParticipantGrid";

function ParticipantsViewer({ isPresenting }) {
  const {
    participants,
    pinnedParticipants,
    activeSpeakerId,
    localParticipant,
    localScreenShareOn,
    presenterId,
  } = useMeeting();

  const participantIds = useMemo(() => {
    const pinnedParticipantIds = new Set(
      [...pinnedParticipants.keys()].filter(
        (participantId) => participantId !== localParticipant.id
      )
    );

    const regularParticipantIds = new Set(
      [...participants.keys()].filter(
        (participantId) =>
          !pinnedParticipantIds.has(participantId) &&
          localParticipant.id !== participantId
      )
    );

    const ids = new Set([
      localParticipant.id,
      ...pinnedParticipantIds,
      ...regularParticipantIds,
    ]);

    if (activeSpeakerId && !ids.has(activeSpeakerId)) {
      ids.add(activeSpeakerId);
    }

    return Array.from(ids).slice(0, isPresenting ? 6 : 16);
  }, [
    participants,
    activeSpeakerId,
    pinnedParticipants,
    presenterId,
    localScreenShareOn,
    localParticipant.id,
    isPresenting,
  ]);

  return (
    <MemoizedParticipantGrid
      participantIds={participantIds}
      isPresenting={isPresenting}
    />
  );
}

const MemorizedParticipantView = React.memo(
  ParticipantsViewer,
  (prevProps, nextProps) => {
    return prevProps.isPresenting === nextProps.isPresenting;
  }
);

export default MemorizedParticipantView;
