import type { NextPageWithLayout } from "@/components/layout";
import { useCollectionStore } from "@/stores";
import type { Artifact as Artifact_T, ArtifactMedia } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Artifact } from "@/components/artifacts";

const Page: NextPageWithLayout = (props: any) => {
  const store = useCollectionStore();

  const { data, isLoading } = useQuery({
    queryKey: ["collections", store.collection.id],
    queryFn: async () => {
      const data = (
        await axios.get(
          `/api/artifact/get.artifacts?collectionId=${store.collection?.id}`
        )
      ).data as Array<Artifact_T & { media: Array<ArtifactMedia> }>;

      return data;
    },
    refetchInterval: 1,
  });

  return (
    data && (
      <div className="my-24">
        {/* <h1 className="text-white">DATA: {JSON.stringify(data)}</h1> */}
        {data.length ? (
          data
            .toReversed()
            .map((artifact, i) => (
              <Artifact
                key={i}
                media={artifact.media}
                description={artifact.description ?? ""}
                createdAt={artifact.createdAt}
              />
            ))
        ) : (
          <div className="flex flex-row items-center justify-center">
            <h1 className="text-[#969696] text-sm font-light italic">
              ~~~ No Artifacts ~~~
            </h1>
          </div>
        )}
      </div>
    )
  );
};

Page.navbar = true;
Page.footer = true;

export default Page;
