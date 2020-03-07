def decodeHex(h):
  if len(h) % 2 == 1:
    h = "0" + h
  return int(h, 16)

def messageToHex(m):
  return m.encode('hex')

n = decodeHex("5a6233f98b05a62af3b7315f32975d8f5f2df64686e4fdc13725c957260ff06b0c8fcd091ab986b08f16deae8806ffe0bdba0bce4bcd128c1be60c46b09f8ff88d5b8a51ee4a8c9d9f4726b7a29255b06bf279a9dbda3906b22fbd607344a8460c75788d94cc922921a7008059011f52e1a167bf8929cdd357a7bc6aa15f24c9")

e = decodeHex("10001")

d = decodeHex("4909470a26059d6bf5767a24fd6be253cc9c80690fa7525a60a7b17ef95c8790d79c9a0b6c79119a33e2c9e55ff9dee5eb8af88621d795e86a5ae257fb246ff7e9a5baf0f6b5487dffc134d56b3dc7ef29a34f738b4f1335364ea112dcf8b90937c5b1c801b1e620103532713e5afe03ad0a10506dbcda85b4fc48bbba01eca1")

p = decodeHex("caa47e333a156d250c9b2f3dab75a043b67052cc31c3ec6d5d9abe39e84abc03a21ea3591e6cb8f561ebfa49366cc4ae10de9240fb4eaf79db98f8dd9b4e298b")

q = decodeHex("8d7e5024b09ddcc883d22fd38d65f0afdaf78fe2f77d852c3b6a0109d713043aeca81de735ee9489baa16d4d01e75845187a3464ac443368d46d1637eab20d81")

message = 'test'
message = messageToHex(message)
message = decodeHex(message)

ciphertext = pow(message, e, n)
print(hex(ciphertext))