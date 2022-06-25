import { Input } from 'app/App.components/Input/Input.view'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// prettier-ignore
import { CreateBgLeft, CreateBgRight, CreateGrid, CreateStyled, UploaderFileSelector, UploaderLabel } from './Create.style'

const { create } = require('ipfs-http-client')

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

type CreateViewProps = {
  createCallback: (name: string, description: string, image: string) => void
  loading: boolean
  accountPkh?: string
  address?: string
}

export const CreateView = ({ address, createCallback, loading, accountPkh }: CreateViewProps) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  async function handleUpload(file: File) {
    try {
      setIsUploading(true)

      const uploadImage = await client.add(file)
      setImageUrl(`ipfs://${uploadImage.path}`)
      console.log(`Uploaded to ipfs://${uploadImage.path}`)

      setIsUploading(false)
    } catch (error: any) {
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <CreateGrid>
      <CreateBgLeft>
        <img alt="bg-left" src="/bg2-left.svg" />
      </CreateBgLeft>
      <CreateStyled>
        <Link to="/">
          <img alt="logo" src="/logo.svg" />
        </Link>

        <div>
          Your smart contract is now deployed on{' '}
          <b>
            <a href={`https://test.better-call.dev/ithacanet/${address}/operations`} target="_blank" rel="noreferrer">
              {address}
            </a>
          </b>{' '}
          with admin <b>{accountPkh}</b>
        </div>
        <div>
          The next step is to create a new token and associated airdrop in the smart contract (Note that only the admin of your contract can
          do so.) Please enter a name and description for your NFT airdrop and upload an image via IPFS. (The current version of
          myairnft.com only support airdrop of identical NFT art, but next versions will allow airdrop of unique NFT art per mint.) You will
          then receive a link and a QR code that you can share with your users/visitors to mint an NFT from your contract.
        </div>

        <label htmlFor="name">Name</label>
        <Input
          name="name"
          placeholder=""
          type="text"
          onChange={(e: any) => setName(e.target.value)}
          value={name}
          onBlur={() => {}}
          inputStatus={undefined}
          errorMessage={undefined}
        />

        <label htmlFor="name">Description</label>
        <Input
          name="description"
          placeholder=""
          type="text"
          onChange={(e: any) => setDescription(e.target.value)}
          value={description}
          onBlur={() => {}}
          inputStatus={undefined}
          errorMessage={undefined}
        />

        <label htmlFor="image">Image</label>
        {imageUrl ? (
          <div>{imageUrl}</div>
        ) : (
          <UploaderFileSelector>
            <UploaderLabel htmlFor="uploader">{isUploading ? 'Uploading...' : 'Upload to IPFS'}</UploaderLabel>
            <input
              id="uploader"
              type="file"
              accept="image/*"
              onChange={(e) => e.target && e.target.files && e.target.files[0] && handleUpload(e.target.files[0])}
            />
          </UploaderFileSelector>
        )}

        {loading ? (
          <div>Creating token...</div>
        ) : (
          <img onClick={() => createCallback(name, description, imageUrl)} alt="button-create" src="/button-create.svg" />
        )}
      </CreateStyled>
      <CreateBgRight>
        <img alt="bg-right" src="/bg2-right.svg" />
      </CreateBgRight>
    </CreateGrid>
  )
}
