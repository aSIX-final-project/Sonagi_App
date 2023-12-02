{
  profileImage ? (
    <Image
      source={{ uri: profileImage }}
      style={{ width: 300, height: 150, borderRadius: 16 }}
      resizeMode="fill"
    />
  ) : (
    <Image
      style={{ width: 300, height: 150, borderRadius: 16 }}
      source={require("../../assets/food4.png")}
      resizeMode="fill"
    />
  );
}
