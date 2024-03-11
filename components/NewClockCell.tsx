import { useState } from 'react'
import { Pressable } from 'react-native'
import { Card, Modal, Portal, Text } from 'react-native-paper'

export default function NewClockCell() {
  const [visible, setVisible] = useState(false)

  const showModal = () => setVisible(true)
  const hideModal = () => setVisible(false)
  return (
    <>
      <Pressable onPress={showModal}>
        <Card mode="outlined">
          <Card.Title title="Add a new Clock" />
        </Card>
      </Pressable>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: 'red',
            padding: 20,
            margin: 20,
          }}
        >
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </>
  )
}
