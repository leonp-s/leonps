const YouTube = ({ id }: { id: string }) => {
  return (
    <div className="overflow-hidden rounded">
      <iframe
        className="aspect-video w-full"
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube Video Player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

export { YouTube };
